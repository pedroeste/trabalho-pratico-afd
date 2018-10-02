let simpleAttrRegex = /[a-z]([0-9a-zA-Z])*(\s)*=(\s)*([a-z]([0-9a-zA-Z])*)[0-9]*;/g;

let fullAttrRegex = /[a-z]([0-9a-zA-Z])*(\s)*=(\s)*([a-z]([0-9a-zA-Z])*)[0-9]*(\s)*[+](\s)*[^$]((([a-z]([0-9a-zA-Z])*)*)+[0-9]);/g;