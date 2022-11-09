FROM node:latest

WORKDIR /app
COPY . .

ENV SESSION_SECRET_KEY="ueR!slFwYgvglJD3qk41vFFAqo117F$CDwNk^2e9ihjdXrz70P"
ENV NEXT_PUBLIC_SENTRY_DSN="https://98ee0510260242e9a665f4bddd351161@o4504117005582336.ingest.sentry.io/4504117006958592"
ENV DATABASE_URI="postgresql://postgres:Dev!123@localhost:5432/school-system"

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

