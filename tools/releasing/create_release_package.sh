#!/usr/bin/env bash

#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

##
## Variables with defaults (if not overwritten by environment)
##
MVN=${MVN:-mvn}

##
## Required variables
##
RELEASE_VERSION=${RELEASE_VERSION}

if [ -z "${RELEASE_VERSION}" ]; then
	echo "RELEASE_VERSION is unset"
	exit 1
fi

# fail immediately
set -o errexit
set -o nounset

CURR_DIR=`pwd`
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
PROJECT_ROOT="$( cd "$( dirname "${BASE_DIR}/../../../" )" >/dev/null && pwd )"

# Sanity check to ensure that resolved paths are valid; a LICENSE file should aways exist in project root
if [ ! -f ${PROJECT_ROOT}/LICENSE ]; then
    echo "Project root path ${PROJECT_ROOT} is not valid; script may be in the wrong directory."
    exit 1
fi

if [ "$(uname)" == "Darwin" ]; then
    SHASUM="shasum -a 512"
else
    SHASUM="sha512sum"
fi

###########################

RELEASE_DIR=${PROJECT_ROOT}/release
CLONE_DIR=${RELEASE_DIR}/paimon-webui-tmp-clone

rm -rf ${RELEASE_DIR}
mkdir ${RELEASE_DIR}

# delete the temporary release directory on error
trap 'rm -rf ${RELEASE_DIR}' ERR

echo "Creating release package"

# create a temporary git clone to ensure that we have a pristine source release
git clone ${PROJECT_ROOT} ${CLONE_DIR}

cd ${CLONE_DIR}
rsync -a \
  --exclude ".git" --exclude ".gitignore" \
  --exclude ".asf.yaml" \
  --exclude "target" \
  --exclude ".idea" --exclude "*.iml" \
  --exclude ".travis.yml" \
  . paimon-webui-${RELEASE_VERSION}

tar czf ${RELEASE_DIR}/apache-paimon-webui-${RELEASE_VERSION}-bin.tgz paimon-webui-${RELEASE_VERSION}
tar czf ${RELEASE_DIR}/apache-paimon-webui-${RELEASE_VERSION}-src.tgz paimon-webui-${RELEASE_VERSION}
gpg --armor --detach-sig ${RELEASE_DIR}/apache-paimon-webui-${RELEASE_VERSION}-bin.tgz
gpg --armor --detach-sig ${RELEASE_DIR}/apache-paimon-webui-${RELEASE_VERSION}-src.tgz
cd ${RELEASE_DIR}
${SHASUM} apache-paimon-webui-${RELEASE_VERSION}-bin.tgz > apache-paimon-webui-${RELEASE_VERSION}-bin.tgz.sha512
${SHASUM} apache-paimon-webui-${RELEASE_VERSION}-src.tgz > apache-paimon-webui-${RELEASE_VERSION}-src.tgz.sha512

rm -rf ${CLONE_DIR}

echo "Done. Release package and signatures created under ${RELEASE_DIR}/."

cd ${CURR_DIR}
