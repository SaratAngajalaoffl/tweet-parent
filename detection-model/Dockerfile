FROM tensorflow/tensorflow

WORKDIR /app

RUN pip install --no-cache-dir numpy nltk flask flask-cors

COPY . .

EXPOSE 8083

CMD ["python","./main.py"]