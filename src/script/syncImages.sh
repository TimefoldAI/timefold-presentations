#!/bin/sh
start=$(date +%s)

# Change directory to the directory of the script
cd "$(dirname $0)" || exit

cd ../.. || exit

timefoldSolverDir=../timefold-solver
timefoldQuickstartsDir=../timefold-quickstarts
timefoldPlatformDir=../timefold-orbit
timefoldModelsSdkDir=../timefold-models-sdk
timefoldModelsDir=../
modelNames=("timefold-field-service-routing" "timefold-employee-scheduling")

timefoldPresentationsDir=`pwd`

if ! which inkscape > /dev/null; then
  echo "ERROR Inkscape is not installed. Install it first."
  echo "  On mac, use: brew install --cask inkscape"
  exit
fi

function failIfDirDoesNotExist() {
  if [ ! -d "$1" ]; then
     echo "ERROR: the dir "$(pwd)/$1" does not exist."
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
  if [ $# -ne 4 ]; then
    echo "ERROR processImages: invalid number of arguments ($#)"
    exit
  fi

  inputDir=$1
  outputDir=${timefoldPresentationsDir}/src/content/$2
  mainFileExtension=$3
  layerFileExtension=$4

  echo "********************"
  echo " processImages ${inputDir}"
  echo "********************"

  git rm $outputDir/**/*.png
  git rm $outputDir/**/*.svg

  pngInputFileList=`find ${inputDir} -type f -name ${mainFileExtension} | sort`
  for pngInputFile in ${pngInputFileList[@]}; do
    relativeFilePath=`echo "${pngInputFile}" | sed "s|${inputDir}||g"`
    relativeParentDirPath=`echo ${relativeFilePath} | sed "s|/[^/]*\.${mainFileExtension}||g"`
    pngOutputFile=${outputDir}${relativeFilePath}
    echo "Copy ${pngOutputFile}"
    mkdir -p ${outputDir}${relativeParentDirPath}
    cp ${pngInputFile} ${pngOutputFile}
  done

  svgInputFileList=`find ${inputDir} -type f -name "*.${layerFileExtension}" | sort`
  for svgInputFile in ${svgInputFileList[@]}; do
    relativeFilePath=`echo ${svgInputFile} | sed "s|${inputDir}||g"`
    relativeParentDirPath=`echo ${relativeFilePath} | sed "s|/[^/]*\.${layerFileExtension}||g"`
    svgOutputFile=`echo "${outputDir}${relativeFilePath}" | sed "s|${timefoldPresentationsDir}/||g"`

    echo "Copy and extract ${svgOutputFile}"
    mkdir -p ${outputDir}${relativeParentDirPath}
    cp ${svgInputFile} ${svgOutputFile}
    extractLayers ${svgOutputFile} ${layerFileExtension}
  done
  git add -A ${outputDir}
}

function copyModelImages() {
  if [ $# -ne 2 ]; then
    echo "ERROR processImages: invalid number of arguments ($#)"
    exit
  fi

  inputDir=$1
  outputDir=${timefoldPresentationsDir}/src/content/$2

  pngInputFileList=`find ${inputDir} -type f -name "*.png" | sort`
  for pngInputFile in ${pngInputFileList[@]}; do
    relativeFilePath=`echo "${pngInputFile}" | sed "s|${inputDir}||g"`
    relativeParentDirPath=`echo ${relativeFilePath} | sed "s|/[^/]*\.png||g"`
    pngOutputFile=${outputDir}${relativeFilePath}
    echo "Copy ${pngOutputFile}"
    mkdir -p ${outputDir}${relativeParentDirPath}
    cp ${pngInputFile} ${pngOutputFile}
  done
}

function extractLayers() {
  if [ $# -ne 2 ]; then
    echo "ERROR extractLayers: invalid number of arguments ($#)"
    exit
  fi

  svgFile=$1
  layerFileExtension=$2

  noExtensionFile=`echo ${svgFile} | sed "s|\.${layerFileExtension}||g"`
  # Do not sort the layerIds. Deliberately keep them from the bottom to top layer.
  layerIdList=($(inkscape --query-all ${svgFile} | grep layer | sed "s|,.*||g"))

  echo "    <section>" >> slidedecks/inventory.html
  for index in "${!layerIdList[@]}";
  do
    select=`echo "${layerIdList[@]:($index + 1)}" | sed "s| |,|g"`
    inkscape ${svgFile} --select="${select}" --actions="delete" -j -C --vacuum-defs --export-text-to-path --export-plain-svg=${noExtensionFile}_${index}.svg > /dev/null || exit

    if [ $index -eq 0 ]; then
      echo "        <img loading=\"lazy\" src=\"../${noExtensionFile}_${index}.svg\" class=\"fullImage\">" >> slidedecks/inventory.html
    else
      echo "        <img loading=\"lazy\" src=\"../${noExtensionFile}_${index}.svg\" class=\"fullImage fragment\">" >> slidedecks/inventory.html
    fi
  done
  echo "    </section>" >> slidedecks/inventory.html
}

cat src/script/templates/slidedeck-header.html > slidedecks/inventory.html

# Upstream images
processImages "${timefoldSolverDir}/docs/src/modules/ROOT/images" "timefold-solver-docs" "png" "svg"
processImages "${timefoldQuickstartsDir}" "timefold-quickstarts" "png" "svg"
for modelName in "${modelNames[@]}"; do
  processImages "${timefoldModelsDir}/${modelName}/docs/modules/ROOT/images" "${modelName}" "svg" "inkscape.svg"
  # also copy all the pngs from the model docs (screenshots etc.)
  copyModelImages "${timefoldModelsDir}/${modelName}/docs/modules/ROOT/images" "${modelName}"
done

# A selection of static images
extractLayers src/content/static/benchmarks/bruteForceHitsTheWall.svg "svg"
extractLayers src/content/static/benchmarks/bruteForceHitsTheWall-TSP.svg "svg"
extractLayers src/content/static/santa/tree-of-greed.svg "svg"
extractLayers src/content/static/santa/tree-of-greed2.svg "svg"
extractLayers src/content/static/santa/vehicleRoutingClassDiagram-simplified.svg "svg"

cat src/script/templates/slidedeck-footer.html >> slidedecks/inventory.html
git add slidedecks/inventory.html

end=$(date +%s)
echo
echo "*******************************"
echo "*** SYNC SUCCESSFUL in $(( ($end - $start) / 1000 )) ms ***"
echo "*******************************"
