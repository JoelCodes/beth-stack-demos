FROM ghcr.io/libsql/sqld:latest

USER root
RUN apt-get update
RUN apt-get install -y curl

ENV TURSO_INSTALL_SKIP_SIGNUP 1
RUN curl -sSfL https://get.tur.so/install.sh | bash
ENV PATH="/root/.turso:$PATH"

