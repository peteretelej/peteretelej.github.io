interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  fork: boolean;
  created_at: string;
  updated_at: string;
}

interface GitHubStarredRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  starred_at?: string;
}

function getGitHubHeaders() {
  const token = import.meta.env.PERSONAL_GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'peteretelej-blog'
  };
  
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  
  return headers;
}

export async function fetchGitHubProfile(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: getGitHubHeaders()
    });
    if (!response.ok) {
      console.error('Failed to fetch GitHub profile:', response.status);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers: getGitHubHeaders()
    });
    if (!response.ok) {
      console.error('Failed to fetch GitHub repos:', response.status);
      return [];
    }
    const repos = await response.json();
    return repos.filter((repo: GitHubRepo) => !repo.fork);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function fetchGitHubReadme(username: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${username}/readme`, {
      headers: getGitHubHeaders()
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    const content = atob(data.content);
    return content;
  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    return null;
  }
}

export async function fetchGitHubStars(username: string): Promise<GitHubStarredRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/starred?sort=created&per_page=10`, {
      headers: {
        ...getGitHubHeaders(),
        'Accept': 'application/vnd.github.v3.star+json'
      }
    });
    
    if (!response.ok) {
      console.error('Failed to fetch GitHub stars:', response.status);
      return [];
    }
    
    const stars = await response.json();
    return stars.map((item: any) => ({
      ...item.repo,
      starred_at: item.starred_at
    }));
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return [];
  }
}