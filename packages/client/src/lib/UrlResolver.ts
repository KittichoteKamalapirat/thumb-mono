class UrlResolver {
  host() {}
  index() {
    return "/"; //http://localhost:3000
  }

  graphql() {
    return "http://localhost:4004/graphql";
  }

  home() {
    return "/";
  }

  myTests() {
    return "/tests";
  }

  myTest(id: string) {
    return `/tests/${id}`;
  }

  createTest() {
    return "/create-test";
  }

  myAccount() {
    return "/account";
  }

  googleLogout(host: string) {
    return `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${host}`;
  }
}

export const urlResolver = new UrlResolver();
