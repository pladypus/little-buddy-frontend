#!/bin/bash

set -e

# npx senv encrypt .env >.env.encrypted
npx senv encrypt .env.development >.env.development.encrypted
npx senv encrypt .env.production >.env.production.encrypted