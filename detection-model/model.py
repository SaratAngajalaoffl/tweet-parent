import tensorflow as tf
from tensorflow import keras
import numpy as np

vocab_size = 100000

def blstm_multi(Xtrain,Ytrain,XVal,YVal,embedlayer):
    model = keras.Sequential()
    model.add(embedlayer)
    model.add(keras.layers.Dropout(0.25))
    model.add(keras.layers.Bidirectional(keras.layers.LSTM(50)))
    model.add(keras.layers.Dropout(0.50))
    model.add(keras.layers.Dense(3, activation='softmax')) 
    model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
    callback = tf.keras.callbacks.EarlyStopping(monitor='loss', patience=3)
    model.fit(Xtrain, Ytrain, epochs=100, batch_size=100, validation_data=(XVal,YVal), verbose=1,callbacks=[callback])
    model.save('saves/blstm_trained')

    return True

def saved_blstm_multi(test):
    loaded_model = keras.models.load_model("saves/blstm_trained")

    res = loaded_model.predict([test])

    prediction = np.argmax(res,axis=1) 

    return prediction