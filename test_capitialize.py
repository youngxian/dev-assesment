# test_play.py
from selenium import webdriver
import pytest
from unittest import TestCase
from selenium.webdriver.chrome.options import Options


# @pytest.mark.usefixtures("driver_class")
@pytest.fixture(scope="class")
class MyTest(TestCase):
    __test__ = True

    def setUp(self):
        options = Options()
        # options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument("--window-size=1280,800")
        options.add_argument('--no-sandbox')
        options.headless = True

        self.driver = webdriver.Chrome(options=options)
        self.url = "https://dev-assessment.herokuapp.com/"
        

    def test_all_users_are_listed(self):
        self.driver.get(self.url)
        assert self.login.username == 'test@mail'

    def test_method2(self):
        assert self.login.password == 'password'

    # def tearDown(self):
    #     self.login.driver.quit()


# def capitalize_string(s):
#     if not isinstance(s, str):
#         raise TypeError('Please provide a string')
#     return s.capitalize()

# def test_capitalize_string():
#     assert capitalize_string('test') == 'Test'