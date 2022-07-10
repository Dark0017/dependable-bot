
<div id="top"></div>

[![LinkedIn][linkedin-shield]](https://linkedin.com/in/ayushman-s-007)
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Dark0017/dependable-bot">
    <img src="images/hero.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Dependable Bot</h3>

  <p align="center">
    
<h4 align="center">A CLI tool to check dependency version on repos, built on <a href="https://nodejs.org/en/" target="_blank">Nodejs</a>.</h4>
    <a href="https://github.com/Dark0017/dependable-bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/Dark0017/dependable-bot/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#commands">Commands</a></li>
    <li><a href="#csv-specifications">CSV Specifications</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/Dark0017/dependable-bot)

- Feed CSV - Specify requirements - Check results
  - Accepts a CSV of with names of projects and Repo links
  - Outputs CSV specifing if a project satisfies the required dependency
- Create PR to upgrade the dependency
  - Single flag to create pull requests to upgrade the dependency on required Repos
  - Adds a column with pull request links to the Output CSV
  <p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started
<!-- PREREQUISITES -->

### Prerequisites

- You're required to install `nodeJS` and `npm` to run the app, follow this [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to installation.

- You will also need to clone the repository follow this [link](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install git

- You will also need a personal access token from your github account, [instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Make sure you have the following permissions checked : 
     - [x] repo
     - [x] repo:status Access commit status
     - [x] repo_deployment Access deployment status
     - [x] public_repo Access public repositories
     - [x] repo:invite Access repository invitations
     - [x] security_events
   - [x] admin:org
     - [x] write:org
     - [x] read:org
   - [x] user
     - [x] read:user
     - [x] user:email
     - [x] user:follow

<!-- INSTALLATION -->

### Installation

```bash
# Clone this repository
$ git clone https://github.com/Dark0017/dependable-bot

# Go into the repository
$ cd dependable-bot

# Install dependencies
$ npm install

# Run the app in the csv directory
$ depend-bot start
```

> **Note**
> Checkout <a href="#CSV Specifications">CSV Specifications</a> to format your CSV file

### Usage Example
[![Product Name Screen Shot][product-gif]](https://github.com/Dark0017/dependable-bot)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- COMMANDS -->

## Commands

---

- `hi`

  - Say hi to dependable bot
  - To check if bot is working

  ```bash
  $ depend-bot hi
  ```

---

- `start`

  - Start dependable bot
  - **Required flags:**

    `-i`: specify the csv file name
    `-t`: specify your github access token

  - **Required argument:**

    `<dependency>`: dependency that will be checked, dependency needs to follow the syntax `<name>@<version>` such as `axios@0.23.0`

  ```bash
  $ depend-bot start -u -i data.csv -t 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 grunt@1.5.3
  ```

  > **Note**
  > Generate your own personal access token for the token flag from github

---

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CSV SPECIFICATIONS -->

## CSV Specifications

- Dependable bot accepts a CSV with 2 columns `name` and `repo` (case sensitive)
- `name` column contains the name of the project
- `repo` column contins the URL to the github repo of the project

A sample of a valid CSV file is given below

| name                    | repo                                             |
| ----------------------- | ------------------------------------------------ |
| dark-react-sample-app   | https://github.com/dark-in/react-sample-app/     |
| dark-js-sample-app      | https://github.com/dark-in/javascript-sample-app |
| dark-sample-app-backend | https://github.com/dark-in/backend-sample-app    |

Sample output CSV

| name                    | repo                                             | version | version_satisfied |
| ----------------------- | ------------------------------------------------ | ------- | ----------------- |
| dark-react-sample-app   | https://github.com/dark-in/react-sample-app/     | 0.24.0  | true              |
| dark-js-sample-app      | https://github.com/dark-in/javascript-sample-app | 0.21.1  | false             |
| dark-sample-app-backend | https://github.com/dark-in/backend-sample-app    | 0.23.0  | true              |

Sample output CSV with update option

Should give an output like:

| name                    | repo                                             | version | version_satisfied | update_pr                                               |
| ----------------------- | ------------------------------------------------ | ------- | ----------------- | ------------------------------------------------------- |
| dark-react-sample-app   | https://github.com/dark-in/react-sample-app/     | 0.24.0  | true              |                                                         |
| dark-js-sample-app      | https://github.com/dark-in/javascript-sample-app | 0.21.1  | false             | https://github.com/dark-in/javascript-sample-app/pull/3 |
| dark-sample-app-backend | https://github.com/dark-in/backend-sample-app    | 0.23.0  | true              |                                                         |

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ayushman Singh - [@Ayushma81703243](https://twitter.com/twitter_handle) - singh.ayush8827@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[contributors-url]: https://github.com/Dark0017/dependable-bot/graphs/contributors
[forks-url]: https://github.com/Dark0017/dependable-bot/network/members
[stars-url]: https://github.com/Dark0017/dependable-bot/**stargazers**
[issues-url]: https://github.com/Dark0017/dependable-bot/issues
[license-url]: https://github.com/Dark0017/dependable-bot/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ayushman-s-007
[product-screenshot]: images/app.png
[product-gif]: images/start.gif
