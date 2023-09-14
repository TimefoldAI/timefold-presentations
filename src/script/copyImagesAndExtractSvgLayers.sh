#!/bin/sh

# Change directory to the directory of the script
cd "$(dirname $0)" || exit

cd ../.. || exit

timefoldPresentationsDir=`pwd`
timefoldSolverDir=../tf-main/timefold-solver
timefoldQuickstartsDir=../tf-main/timefold-quickstarts

function processImages() {
  if [ $# -ne 2 ]; then
    echo "ERROR processImages: invalid number of arguments ($2)"
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
    svgOutputFile=${outputDir}${relativeFilePath}

    echo "Copying ${svgOutputFile}"
    mkdir -p ${outputDir}${relativeParentDirPath}
    cp ${svgInputFile} ${svgOutputFile}
  done
}

processImages "${timefoldSolverDir}/docs/src/modules/ROOT/images" "${timefoldPresentationsDir}/src/timefold-solver-docs"
