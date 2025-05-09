import GitHubButton from 'react-github-btn';

function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <p>Casimir Rönnlöf © 2025</p>
      </div>
      <div className="footer-right">
        <GitHubButton
          href="https://github.com/Cqsi/weather-app"
          data-icon="octicon-star"
          data-size="large"
          data-show-count={true}
          aria-label="Star Cqsi/weather-app on GitHub"
        >
          Star this project
        </GitHubButton>
      </div>
    </footer>
  );
}


export default Footer;