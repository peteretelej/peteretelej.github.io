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

interface PortfolioProject {
  name: string;
  description: string;
  url: string;
  image: string;
  technologies: string[];
}

export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const response = await fetch('https://etelej.com/');
    if (!response.ok) {
      console.error('Failed to fetch portfolio:', response.status);
      return [];
    }
    
    const html = await response.text();
    
    // Parse the HTML to extract portfolio projects using the actual structure
    const projects: PortfolioProject[] = [];
    
    // Pattern to match individual project cards with media-cell structure
    const projectPattern = /<div[^>]*class="media-cell[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/g;
    
    let match;
    while ((match = projectPattern.exec(html)) !== null && projects.length < 5) {
      const projectHtml = match[0];
      
      // Extract image source
      const imgMatch = projectHtml.match(/<img\s+src="([^"]+)"/);
      const imagePath = imgMatch ? imgMatch[1] : '';
      
      // Extract project URL
      const linkMatch = projectHtml.match(/<a\s+href="([^"]+)"><\/a>/);
      const url = linkMatch ? linkMatch[1] : '';
      
      // Extract title from h3
      const titleMatch = projectHtml.match(/<h3>([^<]+)<\/h3>/);
      const name = titleMatch ? titleMatch[1].trim() : '';
      
      // Extract description from p tag
      const descMatch = projectHtml.match(/<p>([\s\S]*?)<\/p>/);
      let description = '';
      if (descMatch) {
        // Clean up description by removing HTML tags and extra whitespace
        description = descMatch[1]
          .replace(/<[^>]*>/g, ' ') // Remove HTML tags
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
      }
      
      // Extract technologies from tech-tag spans
      const techMatches = projectHtml.match(/<span class="tech-tag">([^<]+)<\/span>/g);
      const technologies: string[] = [];
      if (techMatches) {
        techMatches.forEach(techMatch => {
          const techName = techMatch.match(/<span class="tech-tag">([^<]+)<\/span>/);
          if (techName) {
            technologies.push(techName[1].trim());
          }
        });
      }
      
      // Only add project if we have essential data
      if (name && url && imagePath) {
        const image = imagePath.startsWith('/') ? `https://etelej.com${imagePath}` : imagePath;
        
        projects.push({
          name,
          description,
          url,
          image,
          technologies: technologies.slice(0, 4) // Limit to 4 technologies
        });
      }
    }
    
    return projects;
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return [];
  }
}