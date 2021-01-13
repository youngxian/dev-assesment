from selenium import webdriver
import pytest
from unittest import TestCase
from selenium.webdriver.chrome.options import Options
import time

# @pytest.mark.usefixtures("driver_class")
# @pytest.fixture(scope="class")
class MyTest(TestCase):


    def setUp(self):
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument("--window-size=1280,800")
        options.add_argument('--no-sandbox')
        options.headless = False
    
        self.driver = webdriver.Chrome(options=options)
        self.url = "https://dev-assessment.herokuapp.com/"
        self.driver.maximize_window()


    # def test_all_users_are_listed(self):
    #     self.driver.get(self.url)
    #     time.sleep(10)
    #     self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div[1]/div[2]")
    #     self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div[2]")
    #     # assert self.login.username == 'test@mail'

    # def test_user_details_in_list(self):
    #     self.driver.get(self.url)
    #     time.sleep(10)
    #     name = self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div[1]/div[2]/p")
    #     email = self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div[1]/div[2]/div/p[1]")
    #     # check image is displayed
    #     image = self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div[1]/div[1]/img")
    #     image.is_displayed()
    #     self.assertTrue

    def test_user_full_details(self):
        self.driver.get(self.url)
        time.sleep(10)
        self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div[1]/div[3]/button").click()
        image = self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div/div[1]/img")
        image.is_displayed()
        name = self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div/div[2]/p[1]").text
        assert name != ""
        email = self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div/div[2]/div[1]/p")
    
    def test_can_filter_users(self):
        self.driver.get(self.url)
        time.sleep(10)
        self.driver.find_element_by_xpath("/html/body/app-root/section/div[1]/p[2]")
        self.driver.find_element_by_xpath("/html/body/app-root/section/div[1]/p[1]/span")
        self.driver.find_element_by_xpath("/html/body/app-root/section/div[1]/div[2]/div[2]/button").click()
        text = self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/h1").text
        assert text != ""

    def test_user_search(self):
        self.driver.get(self.url)
        time.sleep(10)
        search = self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div[1]/div[2]/h4").text
        self.driver.find_element_by_xpath("//*[@id='search']").send_keys(search)
        time.sleep(10)
        self.driver.find_element_by_xpath("/html/body/app-root/section/div[2]/div[2]/div/div[2]")

    def tearDown(self):
        self.driver.quit()


# def capitalize_string(s):
#     if not isinstance(s, str):
#         raise TypeError('Please provide a string')
#     return s.capitalize()

# def test_capitalize_string():
#     assert capitalize_string('test') == 'Test'
