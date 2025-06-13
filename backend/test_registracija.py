from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

try:
    print("🔗 Otvaranje stranice za registraciju...")
    driver.get("http://localhost:9000/register")
    time.sleep(2)  # sačekaj da se Quasar mounta

    print("🔍 Pronalazak input polja...")
    inputs = driver.find_elements(By.TAG_NAME, "input")

    if len(inputs) < 3:
        raise Exception("❌ Nisu pronađena sva input polja (email, password, confirm password).")

    email_input = inputs[0]
    password_input = inputs[1]
    confirm_input = inputs[2]

    print("⌨️ Unos test podataka...")
    test_email = f"test_{int(time.time())}@example.com"
    email_input.send_keys(test_email)
    password_input.send_keys("lozinka123")
    confirm_input.send_keys("lozinka123")

    print("🖱 Klik na 'Register' dugme...")
    button = driver.find_element(By.XPATH, "//button[contains(., 'Register')]")
    button.click()

    print("⏳ Čekanje odgovora sa servera...")
    time.sleep(3)

    print("🔍 Provera rezultata registracije...")

    # Proveri da li se prikazala poruka o uspehu
    success_elements = driver.find_elements(By.XPATH, "//*[contains(@class, 'text-positive')]")
    error_elements = driver.find_elements(By.XPATH, "//*[contains(@class, 'text-negative')]")

    if success_elements:
        print(f"✅ Registracija uspješna: {success_elements[0].text}")
    elif error_elements:
        print(f"❌ Greška prilikom registracije: {error_elements[0].text}")
    else:
        print("⚠️ Nema prikazanih poruka – moguće da nešto nije u redu sa Vue prikazom.")

finally:
    print("🧹 Zatvaranje browsera...")
    driver.quit()
