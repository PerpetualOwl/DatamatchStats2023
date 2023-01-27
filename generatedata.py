import random

f = open("connections.csv", "w")
dorms = ["Adams", "Quincy", "Dunster", "Cabot", "Eliot", "Thayer", "Weld", "Canaday"]
f.write("loc1,loc2,connections\n")

for i in range(len(dorms)):
    for j in range(i+1,len(dorms)):
        f.write(f"{dorms[i]},{dorms[j]},{random.randint(30, 100)}\n")