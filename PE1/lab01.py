
print("    *")
print("   * *")
print("  *   *")
print(" *     *")
print("***   ***")
print("  *   *")
print("  *   *")
print("  *****")

#01
print("    *\n   * *\n  *   *\n *     *\n***   ***\n  *   *\n  *   *\n  *****")

#02
text=" "*8 + "*\n"
i=7
j=1
while(i>0):
    text = text + " "*i + "*" + " "*j + "*" + "\n"
    i -= 1
    j += 2
print(text)

