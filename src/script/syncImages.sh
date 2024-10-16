#!/bin/sh
start=$(date +%s)

# Change directory to the directory of the script
cd "$(dirname $0)" || exit

cd ../.. || exit

timefoldSolverDir=../../solver/timefold-solver
timefoldQuickstartsDir=../../solver/timefold-quickstarts
timefoldPlatformDir=../../platform/timefold-orbit
timefoldModelsSdkDir=../../platform/timefold-models-sdk
timefoldModelsDir=../../platform
modelNames=("timefold-field-service-routing" "timefold-employee-scheduling")

timefoldPresentationsDir=`pwd`

if ! which inkscape > /dev/null; then
  echo "ERROR Inkscape is not installed. Install it first."
  echo "  On mac, use: brew install --cask inkscape"
  exit
fi

function failIfDirDoesNotExist() {
  if [ ! -d "$1" ]; then
     echo "ERROR: the dir $1 does not exist."
     echo "  Git clone it first."
     exit
  fi
}
failIfDirDoesNotExist ${timefoldSolverDir}
failIfDirDoesNotExist ${timefoldQuickstartsDir}
failIfDirDoesNotExist ${timefoldPlatformDir}
failIfDirDoesNotExist ${timefoldModelsSdkDir}
for modelName in "${modelNames[@]}"; do
 failIfDirDoesNotExist ${timefoldModelsDir}/${modelName}
done


function processImages() {
  if [ $# -ne 2 ]; then
    echo "ERROR processImages: invalid number of arguments ($#)"
    exit
  fi

  inputDir=$1
  outputDir=${timefoldPresentationsDir}/src/content/$2
  echo "********************"
  echo " processImages ${inputDir}"
  echo "********************"

  git rm $outputDir/**/*.png
  git rm $outputDir/**/*.svg

  pngInputFileList=`find ${inputDir} -type f -name "*.png" | sort`
  for pngInputFile in ${pngInputFileList[@]}; do
    relativeFilePath=`echo "${pngInputFile}" | sed "s|${inputDir}||g"`
    relativeParentDirPath=`echo ${relativeFilePath} | sed "s|/[^/]*\.png||g"`
    pngOutputFile=${outputDir}${relativeFilePath}
    echo "Copy ${pngOutputFile}"
    mkdir -p ${outputDir}${relativeParentDirPath}
    cp ${pngInputFile} ${pngOutputFile}
  done

  svgInputFileList=`find ${inputDir} -type f -name "*.svg" | sort`
  for svgInputFile in ${svgInputFileList[@]}; do
    relativeFilePath=`echo ${svgInputFile} | sed "s|${inputDir}||g"`
    relativeParentDirPath=`echo ${relativeFilePath} | sed "s|/[^/]*\.svg||g"`
    svgOutputFile=`echo "${outputDir}${relativeFilePath}" | sed "s|${timefoldPresentationsDir}/||g"`

    echo "Copy and extract ${svgOutputFile}"
    mkdir -p ${outputDir}${relativeParentDirPath}
    cp ${svgInputFile} ${svgOutputFile}
    extractLayers ${svgOutputFile}
  done
  git add -A ${outputDir}
}

function extractLayers() {
  if [ $# -ne 1 ]; then
    echo "ERROR extractLayers: invalid number of arguments ($#)"
    exit
  fi

  svgFile=$1
  noExtensionFile=`echo ${svgFile} | sed "s|\.svg||g"`
  # Do not sort the layerIds. Deliberately keep them from the bottom to top layer.
  layerIdList=($(inkscape --query-all ${svgFile} | grep layer | sed "s|,.*||g"))

  echo "    <section>" >> slidedecks/inventory.html
  for index in "${!layerIdList[@]}";
  do
    select=`echo "${layerIdList[@]:($index + 1)}" | sed "s| |,|g"`
    inkscape ${svgFile} --select="${select}" --actions="delete" -j -C --export-type=png --export-filename=${noExtensionFile}_${index}.png > /dev/null || exit

    if [ $index -eq 0 ]; then
      echo "        <img src=\"../${noExtensionFile}_${index}.png\" class=\"fullImage\">" >> slidedecks/inventory.html
    else
      echo "        <img src=\"../${noExtensionFile}_${index}.png\" class=\"fullImage fragment\">" >> slidedecks/inventory.html
    fi
  done
  echo "    </section>" >> slidedecks/inventory.html
}

cat src/script/templates/slidedeck-header.html > slidedecks/inventory.html

# Upstream images
processImages "${timefoldSolverDir}/docs/src/modules/ROOT/images" "timefold-solver-docs"
processImages "${timefoldQuickstartsDir}" "timefold-quickstarts"
for modelName in "${modelNames[@]}"; do
  processImages "${timefoldModelsDir}/${modelName}/docs/modules/ROOT/images" "${modelName}"
done

# A selection of static images
extractLayers src/content/static/benchmarks/bruteForceHitsTheWall.svg

cat src/script/templates/slidedeck-footer.html >> slidedecks/inventory.html
git add slidedecks/inventory.html

end=$(date +%s)
echo
echo "*******************************"
echo "*** SYNC SUCCESSFUL in $(( ($end - $start) / 1000 )) ms ***"
echo "*******************************"
