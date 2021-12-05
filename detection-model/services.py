from numpy import array, asarray, zeros
import tensorflow as tf
import pickle_helper, embeddings
import math
import model


def get_bullying_prediction(text):
	data = [text]

	print('data is', text)
	
	docs = data
	sequences, padlength = embeddings.simpleEncode(data)
	del data

	t = tf.keras.preprocessing.text.Tokenizer()
	t.fit_on_texts(docs)

	encoded_docs = t.texts_to_sequences(docs)
	
	padded_docs = tf.keras.preprocessing.sequence.pad_sequences(encoded_docs, maxlen=27, padding='post')

	print('padded docs are', padded_docs)
	print('padded length', padlength)

	pred = model.saved_blstm_multi(padded_docs)

	if pred == 1:
		return 'racism'
	elif pred == 2:
		return 'sexism'
	else:
		return 'none' 


def handle_train():
	data, classification = pickle_helper.readPickleData()	

	docs = data
	labels = array(classification)
	sequences, padlength = embeddings.simpleEncode(data)
	del data
	del classification

	# prepare tokenizer
	t = tf.keras.preprocessing.text.Tokenizer()
	t.fit_on_texts(docs)
	vocab_size = len(t.word_index) + 1
	# integer encode the documents
	encoded_docs = t.texts_to_sequences(docs)
	# pad documents
	padded_docs = tf.keras.preprocessing.sequence.pad_sequences(encoded_docs, maxlen=padlength, padding='post')

	print("Prepare Embeddings ...")
	# load the whole embedding into memory
	embeddings_index = dict()
	f = open('GloVe/glove.6B.50d.txt',encoding="utf8")
	for line in f:
		values = line.split()
		word = values[0]
		coefs = asarray(values[1:], dtype='float32')
		embeddings_index[word] = coefs
	f.close()

	print('Loaded %s word vectors.' % len(embeddings_index))

	print("preparing embedding matrices ...")
	# create a weight matrix for words in training docs
	embedding_matrix = zeros((vocab_size, 50))
	for word, i in t.word_index.items():
		embedding_vector = embeddings_index.get(word)
		if embedding_vector is not None:
			embedding_matrix[i] = embedding_vector
		else:
			embedding_matrix[i] = array([0 for x in range(50)])


	e = tf.keras.layers.Embedding(vocab_size, 50, weights=[embedding_matrix], input_length=padlength, trainable=False)

	valsize = len(padded_docs) - math.floor(0.2 * len(padded_docs))
	valX = array(padded_docs[valsize:len(padded_docs)])
	valY = array(labels[valsize:len(labels)])	

	model.blstm_multi(padded_docs,labels,valX,valY,e)

	return True