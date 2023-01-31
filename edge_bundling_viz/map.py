
minLat = 42.368868
maxLat = 42.38248309999999
minLon = -71.124731
maxLon = -71.115963

height = maxLat - minLat
width = maxLon - minLon
minLat -= .20 * height
maxLat += .20 * height
minLon -= .20 * width
maxLon += .20 * width


token = "pk.eyJ1IjoicGVycGV0dWFsb3dsIiwiYSI6ImNsZGptZHI2cjFzaDgzb3I4a3pldmFzN28ifQ.Co912rJ9zIHITERU59D-HA"
style = "perpetualowl/cldjmnyiv005g01o6isgb6der"
bounding_box = [minLon, minLat, maxLon, maxLat]
width = 1280
height = 720

query = f"https://api.mapbox.com/styles/v1/{style}/static/[{bounding_box[0]},{bounding_box[1]},{bounding_box[2]},{bounding_box[3]}]/{width}x{height}@2x?logo=false&access_token={token}"

print(query)
import requests # request img from web
import shutil # save img locally

url = query
file_name = "./img.jpeg"

res = requests.get(url, stream = True)

if res.status_code == 200:
    with open(file_name,'wb') as f:
        shutil.copyfileobj(res.raw, f)
    print('Image sucessfully Downloaded: ',file_name)
else:
    print('Image Couldn\'t be retrieved')