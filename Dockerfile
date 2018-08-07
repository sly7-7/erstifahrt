FROM ruby:2.5-alpine

COPY Gemfile* /tmp/
WORKDIR /tmp
RUN bundle install

FROM node:9.9-alpine

COPY /assets /app
WORKDIR /app

RUN npm install && \
  npm run-script build

FROM ruby:2.5-alpine

COPY . /app
WORKDIR /app

RUN rm -rf /app/assets

COPY --from=0 /usr/local/bundle /usr/local/bundle
COPY --from=1 /app/dist /app/public

CMD ["bundle", "exec", "ruby", "app.rb"]
