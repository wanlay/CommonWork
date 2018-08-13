module.exports = {
    title: "my-site",
    description: "my site",
    base: "/document/",
    head: [
        [
            "link",
            {
                rel: "icon",
                href: "/favicon.ico"
            }
        ]
    ],
    themeConfig: {
        repo: "wanlay/document",
        docsRepo: "wanlay/document",
        docsDir: "docs",
        editLinks: true,
        sidebarDepth: 3,
        locales: {
            "/": {
                editLinkText: "在 GitHub 上编辑此页",
                nav: [{
                        text: "linux",
                        link: "/linux/"
                    },
                    {
                        text: "docker",
                        link: "/docker/"
                    },
                    {
                        text: "语言",
                        link: "/language/"
                    },
                    {
                        text: "windows",
                        link: "/windows/"
                    },
                    {
                        text: "其他",
                        link: "/others/"
                    }
                ],
                sidebar: {
                    "/linux/": [{
                            title: "基础",
                            collapsable: false,
                            children: [
                                "/linux/others/ssh.md",
                                "/linux/others/network-config.md",
                                "/linux/others/ansible-config.md",
                                "/linux/others/cgit.md",
                                "/linux/others/CMD.md",
                                "/linux/others/ghost-install.md",
                                "/linux/others/git-config.md",
                                "/linux/others/github-linux.md",
                                "/linux/others/lvm-extend.md",
                                "/linux/others/nfs.md",
                                "/linux/others/shell-usage.md",
                                "/linux/others/software-install.md",
                                "/linux/others/vSphere.md",
                            ]
                        },
                        {
                            title: "ubuntu",
                            collapsable: false,
                            children: [
                                "/linux/ubuntu/install.md",
                                "/linux/ubuntu/problems.md",
                            ]
                        },
                        {
                            title: "centos",
                            collapsable: false,
                            children: [
                                "/linux/centos/problems.md",
                            ]
                        }
                    ],
                    "/docker/": [{
                            title: "基础",
                            collapsable: false,
                            children: [
                                "/docker/common/install.md",
                                "/docker/common/tips.md",
                                "/docker/common/github.md",
                                "/docker/common/container.md",
                                "/docker/common/Dockerfile.md",
                            ]
                        },
                        {
                            title: "k8s",
                            collapsable: false,
                            children: [
                                "/docker/k8s/install.md",
                                "/docker/k8s/cmd.md",
                                "/docker/k8s/service.md",
                            ]
                        }
                    ],
                    "/language/": [{
                        title: "python",
                        collapsable: false,
                        children: [
                            "/language/python/debug.md",
                            "/language/python/selenium.md",
                            "/language/python/tips.md",
                        ]
                    }],
                    "/windows/": [{
                        // title: "windows",
                        collapsable: false,
                        children: [
                            "/windows/android.md",
                            "/windows/vscode.md",
                            "/windows/windows.md",
                        ]
                    }],
                    "/others/": [{
                        // title: "others",
                        collapsable: false,
                        children: [
                            "/others/js-usage.md",
                            "/others/maven-config.md",
                            "/others/mysql-config.md",
                            "/others/nginx-config.md",
                            "/others/openstack-install.md",
                            "/others/re.md",
                            "/others/source.md",
                            "/others/tomcat-config.md",

                        ]
                    }]
                }
            }
        }
    },
    locales: {
        "/": {
            lang: "zh-CN",
            description: "mysite"
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@public": "./public"
            }
        }
    },
};