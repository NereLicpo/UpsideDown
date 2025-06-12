from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import time

# ⚙️ Pokreće Chrome (preuzmi chromedriver ako nemaš)
driver = webdriver.Chrome()

try:
    print("Navigating to http://localhost:9000/#/registracija...")
    driver.get("http://localhost:9000/#/registracija")

    print("Waiting for page to load...")
    time.sleep(2)

    # 🎯 Selektori na temelju labela (Quasar renderira inpute unutar divova)
    print("Finding form elements...")
    inputs = driver.find_elements(By.TAG_NAME, "input")
    email_input = inputs[0]
    password_input = inputs[1]
    confirm_input = inputs[2]

    print("Filling out the form...")
    test_email = f"test_{int(time.time())}@example.com"
    email_input.send_keys(test_email)
    password_input.send_keys("lozinka123")
    confirm_input.send_keys("lozinka123")

    print("Form fields filled successfully.")

    # 🔘 Klikni Register gumb
    print("Clicking submit button...")
    button = driver.find_element(By.XPATH, "//button[contains(., 'Register')]")
    button.click()

    print("Waiting for registration success...")
    time.sleep(3)

    # ✅ Provjera poruke uspjeha
    body_text = driver.find_element
