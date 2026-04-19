import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model

def train_model(data_dir, epochs=10, batch_size=32):
    """
    Trains a MobileNetV2 model on a custom dataset (e.g. PlantVillage)
    Dataset structure should be:
        data_dir/
            class_1/
                img1.jpg
                img2.jpg
            class_2/
                ...
    """
    if not os.path.exists(data_dir):
        print(f"Dataset directory '{data_dir}' not found.")
        print("Please download the PlantVillage dataset and extract it here.")
        return

    # Image Data Generators for Augmentation
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        validation_split=0.2 # 80/20 train/val split
    )

    train_generator = train_datagen.flow_from_directory(
        data_dir,
        target_size=(224, 224),
        batch_size=batch_size,
        class_mode='categorical',
        subset='training'
    )

    val_generator = train_datagen.flow_from_directory(
        data_dir,
        target_size=(224, 224),
        batch_size=batch_size,
        class_mode='categorical',
        subset='validation'
    )
    
    num_classes = len(train_generator.class_indices)
    print(f"Found {num_classes} classes: {train_generator.class_indices}")

    # Build the Model (Transfer Learning from MobileNetV2)
    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    
    # Freeze the base model
    for layer in base_model.layers:
        layer.trainable = False

    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    predictions = Dense(num_classes, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    print("Starting Training...")
    history = model.fit(
        train_generator,
        epochs=epochs,
        validation_data=val_generator
    )

    # Save the model
    os.makedirs('../backend/models', exist_ok=True)
    model.save('../backend/models/disease_detection_model.h5')
    print("Model saved to '../backend/models/disease_detection_model.h5'")

if __name__ == "__main__":
    # Example usage
    # Download dataset from Kaggle:
    # https://www.kaggle.com/datasets/emmarex/plantdisease
    TRAIN_DIR = "data/PlantVillage"
    train_model(TRAIN_DIR, epochs=5)
