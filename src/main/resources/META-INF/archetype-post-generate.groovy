def rootDir = new File(request.getOutputDirectory() + "/" + request.getArtifactId())
def optionFrontend = request.getProperties().get("optionFrontend")
def appsPackage = new File(rootDir, "content/jcr_root/apps/${projectName}")

// rename according submodule as there will be only one frontend project left
assert new File(rootDir, "${optionFrontend}-app").renameTo(new File(rootDir, "app"))

// rename body render script in page component
assert new File(appsPackage, "components/page/body_${optionFrontend}.html")
        .renameTo(new File(appsPackage, "components/page/body.html"))


// Cleanup sub modules
new File(rootDir, "angular-app").deleteDir()
new File(rootDir, "react-app").deleteDir()

// Cleanup files
new File(appsPackage, "components/page/body_angular.html").delete()
new File(appsPackage, "components/page/body_react.html").delete()
