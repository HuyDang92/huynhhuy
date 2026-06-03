const SESSION_KEY = "admin_session";
const SESSION_DURATION = 30 * 60 * 1000;

interface AdminSession {
  loggedIn: boolean;
  timestamp: number;
}

export function login(username: string, password: string): boolean {
  if (username === "capyboii" && password === "922003") {
    const session: AdminSession = { loggedIn: true, timestamp: Date.now() };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return false;
  try {
    const session: AdminSession = JSON.parse(raw);
    if (!session.loggedIn) return false;
    if (Date.now() - session.timestamp > SESSION_DURATION) {
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function getSessionTimeLeft(): number {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return 0;
  try {
    const session: AdminSession = JSON.parse(raw);
    return Math.max(0, SESSION_DURATION - (Date.now() - session.timestamp));
  } catch {
    return 0;
  }
}
