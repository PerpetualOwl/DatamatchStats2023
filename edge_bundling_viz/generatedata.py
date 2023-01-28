import random

f = open("connections.csv", "w")
dorms = ["Adams", "Quincy", "Dunster", "Cabot", "Eliot", "Thayer", "Weld", "Canaday"]
f.write("origin,destination,count\n")

for i in range(len(dorms)):
    for j in range(len(dorms)):
        if i != j:
            f.write(f"{dorms[i]},{dorms[j]},{random.randint(30, 100)}\n")