FROM ubuntu:22.04

RUN apt update \
    && apt install -y python3-pip \
    && pip3 install --upgrade pip wheel setuptools \
    && apt clean \
    && rm -rf /var/lib/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY server.py .
COPY wsgi.py .
RUN mkdir uploads

EXPOSE 5005
ENTRYPOINT ["gunicorn", "-w", "4", "-b", "0.0.0.0:5005", "wsgi:app"]