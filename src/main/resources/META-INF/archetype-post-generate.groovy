def rootDir = new File(request.getOutputDirectory() + "/" + request.getArtifactId())
def optionFrontend = request.getProperties().get("optionFrontend")
def appsPackage = new File(rootDir, "ui.apps/src/main/content/jcr_root/apps/${projectName}")

// rename body render script in page component
assert new File(appsPackage, "components/page/body_${optionFrontend}.html")
        .renameTo(new File(appsPackage, "components/page/body.html"))


// Cleanup sub modules
if ("angular".equals(optionFrontend)) {
    new File(rootDir, "react-app").deleteDir()
}

if ("react".equals(optionFrontend)) {
    new File(rootDir, "angular-app").deleteDir()
}

// Cleanup files
new File(appsPackage, "components/page/body_angular.html").delete()
new File(appsPackage, "components/page/body_react.html").delete()
