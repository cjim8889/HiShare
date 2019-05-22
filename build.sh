#!/bin/bash
export Recaptcha_SecretKey="6LcW5KEUAAAAAJUlB1r539Z98-A5f-sNZbrLgE5t"
export REACT_APP_API_URL="https://share.api.oxifus.com"
export REACT_APP_RECAPTCHA_SITEKEY="6LcW5KEUAAAAALv-3CULoySYrCK1zKmZjOo0MbAM"

docker-compose build
docker-compose push
