workflow "Deploy" {
  on = "push"
  resolves = ["Install"]
}

# Only run on `master` branch
action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

# `npm ci`
action "Install" {
  uses = "actions/npm@master"
  args = "ci"
  needs = ["Master"]
}
