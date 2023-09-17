#!/bin/sh
start=$(date +%s%N)

# Change directory to the directory of the script
cd "$(dirname $0)" || exit

cd ../.. || exit

timefoldPresentationsDir=`pwd`
timefoldSolverDir=../tf-main/timefold-solver
timefoldQuickstartsDir=../tf-main/timefold-quickstarts

if ! which inkscape > /dev/null; then
  echo "ERROR Inkscape is not installed. Install it first."
  exit
fi

function processImages() {
  if [ $# -ne 2 ]; then
    echo "ERROR processImages: invalid number of arguments ($#)"
    exit
  fi

  inputDir=$1
  outputDir=$2
  echo "********************"
  echo " processImages ${inputDir}"
  echo "********************"

  pngInputFileList=`find ${inputDir} -type f -name "*.png" | sort`
  for pngInputFile in ${pngInputFileList[@]}; do
    relativeFilePath=`echo ${pngInputFile} | sed "s|${inputDir}||g"`
    relativeParentDirPath=`echo ${relativeFilePath} | sed "s|/[^/]*\.png||g"`
    pngOutputFile=${outputDir}${relativeFilePath}
    echo "Copying ${pngOutputFile}"
    mkdir -p ${outputDir}${relativeParentDirPath}
    cp ${pngInputFile} ${pngOutputFile}
  done

  svgInputFileList=`find ${inputDir} -type f -name "*.svg" | sort`
  for svgInputFile in ${svgInputFileList[@]}; do
    relativeFilePath=`echo ${svgInputFile} | sed "s|${inputDir}||g"`
    relativeParentDirPath=`echo ${relativeFilePath} | sed "s|/[^/]*\.svg||g"`
    svgOutputFile=`echo "${outputDir}${relativeFilePath}" | sed "s|${timefoldPresentationsDir}/||g"`

    echo "Copying ${svgOutputFile}"
    mkdir -p ${outputDir}${relativeParentDirPath}
    cp ${svgInputFile} ${svgOutputFile}
    extractLayers ${svgOutputFile}
  done
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
    inkscape ${svgFile} --select="${select}" --actions="delete" -j -C --export-type=png --export-filename=${noExtensionFile}_${index}.png > /dev/null

    if [ $index -eq 0 ]; then
      echo "        <img src=\"../${noExtensionFile}_${index}.png\" class=\"fullImage\">" >> slidedecks/inventory.html
    else
      echo "        <img src=\"../${noExtensionFile}_${index}.png\" class=\"fullImage fragment\">" >> slidedecks/inventory.html
    fi
  done
  echo "    </section>" >> slidedecks/inventory.html
}

cat src/script/templates/slidedeck-header.html > slidedecks/inventory.html
processImages "${timefoldSolverDir}/docs/src/modules/ROOT/images" "${timefoldPresentationsDir}/src/content/timefold-solver-docs"
cat src/script/templates/slidedeck-footer.html >> slidedecks/inventory.html
git add slidedecks/inventory.html

end=$(date +%s%N)
echo
echo "*******************************"
echo "*** SYNC SUCCESSFUL in $(( ($end - $start) / 1000000 )) ms ***"
echo "*******************************"
