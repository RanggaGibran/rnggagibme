import { useEffect, useMemo, useState } from "react";

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  topics?: string[];
  archived: boolean;
  fork: boolean;
}

interface UseGithubReposResult {
  repos: GithubRepo[];
  status: "idle" | "loading" | "error" | "success";
  error?: string;
  refresh: () => void;
}

const API_BASE = "https://api.github.com";

const numericSort = (a: GithubRepo, b: GithubRepo) => {
  return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
};

const normalizeRepo = (repo: GithubRepo) => ({
  ...repo,
  description: repo.description ?? "No description added yet",
});

export const useGithubRepos = (username: string | null | undefined): UseGithubReposResult => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<UseGithubReposResult["status"]>("idle");
  const [error, setError] = useState<string>();
  const [token, setToken] = useState(0);

  const normalizedUsername = useMemo(() => username?.trim() ?? "", [username]);

  useEffect(() => {
    if (!normalizedUsername) {
      setStatus("error");
      setError("GitHub username is missing. Update src/data/profile.ts");
      return;
    }

    let aborted = false;
    const controller = new AbortController();

    const fetchRepos = async () => {
      setStatus("loading");
      setError(undefined);
      try {
        const response = await fetch(
          `${API_BASE}/users/${normalizedUsername}/repos?sort=updated&per_page=100`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error (${response.status})`);
        }

        const payload = (await response.json()) as GithubRepo[];
        if (!aborted) {
          const cleaned = payload
            .filter((repo) => !repo.fork)
            .sort(numericSort)
            .map(normalizeRepo);
          setRepos(cleaned);
          setStatus("success");
        }
      } catch (err) {
        if (aborted) {
          return;
        }
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setStatus("error");
      }
    };

    fetchRepos();

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [normalizedUsername, token]);

  const refresh = () => setToken((prev) => prev + 1);

  return { repos, status, error, refresh };
};
