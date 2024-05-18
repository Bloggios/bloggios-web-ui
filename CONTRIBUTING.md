# Contributing

Prior to contributing to this project, we kindly request that you initiate a discussion regarding the proposed change
through an issue on any of our GitHub repository, via email at [email](mailto:support@bloggios.com), or through any
other preferred communication method with the project owners. Your cooperation in this regard is greatly appreciated.

Please note we have a [Code of Conduct](https://github.com/reactplay/react-play/blob/main/CODE_OF_CONDUCT.md), please
follow it in all your interactions with the project.

- [Pull Request Process](#prp)
- [Code of Conduct](#coc)
- [Commit Message Format](#commit)

## <a name="prp"></a> Pull Request Process

This document outlines the guidelines for submitting and approving pull requests (PRs) within the **bloggios_frontend** repository.

## PR Approval Process

1. **Dependency Management**: Ensure any install or build dependencies are removed. If holding dependencies is necessary, seek approval from the project owner before finalizing the build.

2. **Update README**: Update the README.md file with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.

4. **Review and Merge**: You may merge the Pull Request once you have received sign-off from two other developers. If you lack the permissions to merge, request the second reviewer to do so.

## PR Approval Template

```
**This pull request makes the following changes:**
- Fixes issue #[issue-no.].

**Checklist:**
- [x] I have created an issue for this solution I am submitting.
- [x] I have created a new branch from the correct branch and made my changes in the new branch created.
- [x] My pull request is sent to the correct base branch in the original repository.
- [x] I have linked the issue I worked on to this pull request.
- [x] File(s) or folder(s) now contain changes as specified in the issue I worked on.
- [x] I certify that I ran my checklist.

Ping @<github-username>
```

## <a name="coc"></a> Code of Conduct

## Our Pledge

We, as members, contributors, and leaders of Bloggios, pledge to cultivate a harassment-free environment for all
participants, irrespective of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race,
religion, or sexual identity and orientation.

We commit to engaging in behaviors that foster an open, welcoming, diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that foster a positive environment within our Bloggios community include:

- Demonstrating empathy and kindness towards others
- Respecting differing opinions, viewpoints, and experiences
- Giving and graciously accepting constructive feedback
- Taking responsibility for our actions, apologizing to those affected by our mistakes, and learning from these
  experiences
- Prioritizing the collective well-being of the community over individual interests

Examples of unacceptable behavior include:

- Use of sexualized language or imagery, and any form of sexual attention or advances
- Trolling, making derogatory comments, or engaging in personal or political attacks
- Harassment, whether public or private
- Sharing others' private information, such as physical or email addresses, without explicit permission
- Any other conduct that could reasonably be considered inappropriate in a professional setting

## Enforcement Responsibilities

Community leaders within Bloggios are responsible for upholding and enforcing our standards of acceptable behavior. They
will take appropriate and impartial corrective action in response to any behavior deemed inappropriate, threatening,
offensive, or harmful.

Community leaders reserve the right to remove, edit, or reject comments, commits, code, wiki edits, issues, and other
contributions that do not align with this Code of Conduct. They will communicate the reasons for moderation decisions
when necessary.

## Scope

This Code of Conduct applies to all interactions within Bloggios community spaces, as well as when individuals
officially represent the community in public settings. Representation may include the use of an official email address,
posting via official social media accounts, or acting as an appointed representative at online or offline events.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior should be reported to the community leaders
responsible for enforcement at [support@bloggios.com](mailto:support@bloggios.com). All complaints will be promptly
and fairly reviewed and investigated.

Community leaders are obligated to respect the privacy and security of the individual reporting any incident.

## Enforcement Guidelines

Community leaders will adhere to these Enforcement Guidelines in determining consequences for actions violating this
Code of Conduct:

1. **Correction**: Community Impact - Use of inappropriate language or behavior deemed unprofessional or unwelcome.

   Consequence - A private, written warning from community leaders, offering clarity on the nature of the violation and
   an explanation of its inappropriateness. A public apology may be requested.

2. **Warning**: Community Impact - Violation through a single incident or series of actions.

   Consequence - A warning with repercussions for continued behavior. The individual will have no interaction with the
   involved parties, including unsolicited communication with those enforcing the Code of Conduct, for a specified
   period. This includes abstaining from interactions in community spaces and external channels like social media.
   Violation may result in a temporary or permanent ban.

3. **Temporary Ban**: Community Impact - Serious violation of community standards, including sustained inappropriate
   behavior.

   Consequence - A temporary ban from any interaction or public communication with the community for a specified period.
   No public or private interaction with the involved parties is permitted, including unsolicited communication with
   those enforcing the Code of Conduct. Violation may lead to a permanent ban.

4. **Permanent Ban**: Community Impact - Demonstrating a pattern of violating community standards, including sustained
   inappropriate behavior, harassment of individuals, or aggression towards or disparagement of classes of individuals.

   Consequence - A permanent ban from Bloggios community participation.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org

[version]: http://contributor-covenant.org/version/1/4/

## <a name="commit"></a> Commit Message Format

We uphold precise rules regarding the formatting of Git commit messages within the Bloggios project. Adhering to this format facilitates a **clearer and more comprehensible commit history**.

Each commit message comprises a **header**, a **body** (except for "docs" commits), and an optional **footer**.

```
<type>
<BLANK LINE>
<scope>
<BLANK LINE>
<summary>
```

- **Type**: Must be one of the following:
    - build: Changes affecting the build system or external dependencies
    - feature: Addition of new Feature
    - bugFix: Fix for some bug
    - ci: Changes to CI configuration files and scripts
    - docs: Documentation-only changes
    - perf: Code changes improving performance
    - refactor: Code changes not related to bug fixes or feature additions
    - test: Addition or correction of tests

- **Summary**: A succinct description of the change:
    - Use imperative, present tense (e.g., "change" not "changed" or "changes")
    - Do not capitalize the first letter
    - Omit periods at the end

#### <a name="commit-header"></a>Commit Message Header

```
<type>/<short summary>
  │         │
  │         └─⫸ Short description about the commit.
  │
  └─⫸ Commit Type: build|ci|docs|feature|bugFix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

##### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies
* **ci**: Changes to our CI configuration files and script
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **test**: Adding missing tests or correcting existing tests

##### Summary

Use the summary field to provide a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Revert commits

- If the commit reverts a previous commit, begin with "revert:", followed by the header of the reverted commit.
- The body should contain:
- Information about the SHA of the reverted commit (e.g., "This reverts commit <SHA>").
- A clear description of the reason for reverting the commit.