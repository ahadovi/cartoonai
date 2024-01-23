from flask import Flask, request, jsonify
import requests
import uuid
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def forward_request():
    try:
        
        # Get the uploaded files from the request
        json_file = request.files['json_data']
        uid = str(uuid.uuid4())
        json_extension = os.path.splitext(json_file.filename)[1]
        json_key = f'{uid}{json_extension}'
        json_file.save(os.path.join('uploads', json_key))
        json_file_path = f'uploads/{json_key}'

        files = {}

        files['json_data'] = open(json_file_path, 'rb')
        os.remove(json_file_path)

        if 'image' in request.files:
            image_file = request.files['image']
            img_extension = os.path.splitext(image_file.filename)[1]
            image_key = f"{uid}_1{img_extension}"
            image_file.save(os.path.join('uploads', image_key))
            image_file_path = f'uploads/{image_key}'
            files['image'] = open(image_file_path, 'rb')
            os.remove(image_file_path)

        if 'controlnet_1' in request.files:
            controlnet_1_image_file = request.files['controlnet_1']
            controlnet_1_img_extension = os.path.splitext(controlnet_1_image_file.filename)[1]
            controlnet_1_image_key = f"{uid}_2{controlnet_1_img_extension}"
            controlnet_1_image_file.save(os.path.join('uploads', controlnet_1_image_key))
            controlnet_1_image_path = f'uploads/{controlnet_1_image_key}'
            files['controlnet_1'] = open(controlnet_1_image_path, 'rb')
            os.remove(controlnet_1_image_path)

        if 'controlnet_2' in request.files:
            controlnet_2_image_file = request.files['controlnet_2']
            controlnet_2_img_extension = os.path.splitext(controlnet_2_image_file.filename)[1]
            controlnet_2_image_key = f"{uid}_3{controlnet_2_img_extension}"
            controlnet_2_image_file.save(os.path.join('uploads', controlnet_2_image_key))
            controlnet_2_image_path = f'uploads/{controlnet_2_image_key}'

            files['controlnet_2'] = open(controlnet_2_image_path, 'rb')
            os.remove(controlnet_2_image_path)


        if 'controlnet_3' in request.files:
            controlnet_3_image_file = request.files['controlnet_3']
            controlnet_3_img_extension = os.path.splitext(controlnet_3_image_file.filename)[1]
            controlnet_3_image_key = f"{uid}_4{controlnet_3_img_extension}"
            controlnet_3_image_file.save(os.path.join('uploads', controlnet_3_image_key))
            controlnet_3_image_path = f'uploads/{controlnet_3_image_key}'
            
            files['controlnet_3'] = open(controlnet_3_image_path, 'rb')
            os.remove(controlnet_3_image_path)


        target_url = 'http://103.4.146.170:8090/api/run-sd/'
        response = requests.post(target_url, files=files)

        return jsonify(response.json()), response.status_code
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="5005")