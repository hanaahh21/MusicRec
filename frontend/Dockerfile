#   Copyright IBM Corporation 2020
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

FROM registry.access.redhat.com/ubi8/nodejs-16
COPY . .
RUN mkdir -p /opt/app-root/src/.npm
RUN chown -R 1001:0 /opt/app-root/src/
RUN chmod -R 775 /opt/app-root/src/
USER 10014
ENV VITE_CACHE_DIR=/tmp/vite-cache
RUN npm install
EXPOSE 5143
CMD ["npm", "run", "dev"]
