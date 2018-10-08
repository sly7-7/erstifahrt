IMAGE ?= registry.hhu-fscs.de/erstifahrt
TAG ?= $(shell git rev-parse --short HEAD)

FULL_TAG ?= $(IMAGE):$(TAG)

BUILD_ARGS ?= -t $(IMAGE)

default: docker-build

docker-build:
	docker build $(BUILD_ARGS) .
	docker tag $(IMAGE) $(FULL_TAG)
.PHONY: docker-build

docker-push: docker-build
	docker push $(IMAGE)
	docker push $(FULL_TAG)
.PHONY: docker-push

CONTAINER ?= erstifahrt-dev
NETWORK ?= $(CONTAINER)-net
docker-create: docker-clean docker-build
	docker create --name $(CONTAINER) --network $(NETWORK) -p9292:9292 -v$(shell pwd):/app $(IMAGE):latest
.PHONY: docker-create

docker-start:
	docker start -a $(CONTAINER)
.PHONY: docker-run

docker-clean:
	docker rm -f $(CONTAINER) || true
