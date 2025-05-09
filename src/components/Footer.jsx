import GitHubButton from 'react-github-btn';

function Footer() {
  return (
    <footer>
      <p>Casimir Rönnlöf © 2025</p>
      <GitHubButton
        href="https://github.com/Cqsi/weather-app"
        data-icon="octicon-star"
        data-size="large"
        data-show-count={true}
        aria-label="Star Cqsi/weather-app on GitHub"
      >
        Star this project
      </GitHubButton>
    </footer>
  );
}

export default Footer;