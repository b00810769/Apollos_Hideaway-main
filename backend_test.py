import requests
import sys
import json
from datetime import datetime, timedelta

class ApollosHideawayAPITester:
    def __init__(self, base_url="https://luxury-escape.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data}"
            self.log_test("API Root", success, details)
            return success
        except Exception as e:
            self.log_test("API Root", False, str(e))
            return False

    def test_get_villas(self):
        """Test getting all villas"""
        try:
            response = requests.get(f"{self.api_url}/villas", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                villas = response.json()
                villa_count = len(villas)
                details += f", Villa count: {villa_count}"
                
                # Check if we have 10 villas as expected
                if villa_count == 10:
                    details += " (Expected 10 villas ✓)"
                    # Store first villa for later tests
                    self.test_villa = villas[0] if villas else None
                else:
                    details += f" (Expected 10 villas, got {villa_count})"
                    success = False
                    
            self.log_test("Get All Villas", success, details)
            return success
        except Exception as e:
            self.log_test("Get All Villas", False, str(e))
            return False

    def test_get_single_villa(self):
        """Test getting a single villa"""
        if not hasattr(self, 'test_villa') or not self.test_villa:
            self.log_test("Get Single Villa", False, "No villa available from previous test")
            return False
            
        try:
            villa_id = self.test_villa['id']
            response = requests.get(f"{self.api_url}/villas/{villa_id}", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}, Villa ID: {villa_id}"
            
            if success:
                villa = response.json()
                details += f", Villa name: {villa.get('name', 'N/A')}"
                
            self.log_test("Get Single Villa", success, details)
            return success
        except Exception as e:
            self.log_test("Get Single Villa", False, str(e))
            return False

    def test_check_availability(self):
        """Test availability check"""
        if not hasattr(self, 'test_villa') or not self.test_villa:
            self.log_test("Check Availability", False, "No villa available from previous test")
            return False
            
        try:
            villa_id = self.test_villa['id']
            check_in = (datetime.now() + timedelta(days=7)).isoformat()
            check_out = (datetime.now() + timedelta(days=10)).isoformat()
            
            params = {
                'villa_id': villa_id,
                'check_in': check_in,
                'check_out': check_out
            }
            
            response = requests.get(f"{self.api_url}/bookings/availability", params=params, timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                availability = response.json()
                details += f", Available: {availability.get('available', 'N/A')}"
                
            self.log_test("Check Availability", success, details)
            return success
        except Exception as e:
            self.log_test("Check Availability", False, str(e))
            return False

    def test_create_booking(self):
        """Test creating a booking"""
        if not hasattr(self, 'test_villa') or not self.test_villa:
            self.log_test("Create Booking", False, "No villa available from previous test")
            return False
            
        try:
            villa_id = self.test_villa['id']
            check_in = (datetime.now() + timedelta(days=14)).isoformat()
            check_out = (datetime.now() + timedelta(days=17)).isoformat()
            
            booking_data = {
                'villa_id': villa_id,
                'guest_name': 'Test Guest',
                'email': 'test@example.com',
                'phone': '+1234567890',
                'check_in': check_in,
                'check_out': check_out,
                'guests': 2
            }
            
            response = requests.post(f"{self.api_url}/bookings", json=booking_data, timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                booking = response.json()
                details += f", Booking ID: {booking.get('id', 'N/A')}"
                details += f", Total: ${booking.get('total_price', 'N/A')}"
                # Store booking for later tests
                self.test_booking = booking
                
            self.log_test("Create Booking", success, details)
            return success
        except Exception as e:
            self.log_test("Create Booking", False, str(e))
            return False

    def test_get_booking(self):
        """Test getting a booking"""
        if not hasattr(self, 'test_booking') or not self.test_booking:
            self.log_test("Get Booking", False, "No booking available from previous test")
            return False
            
        try:
            booking_id = self.test_booking['id']
            response = requests.get(f"{self.api_url}/bookings/{booking_id}", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}, Booking ID: {booking_id}"
            
            if success:
                booking = response.json()
                details += f", Guest: {booking.get('guest_name', 'N/A')}"
                
            self.log_test("Get Booking", success, details)
            return success
        except Exception as e:
            self.log_test("Get Booking", False, str(e))
            return False

    def test_payment_checkout(self):
        """Test payment checkout creation"""
        if not hasattr(self, 'test_booking') or not self.test_booking:
            self.log_test("Payment Checkout", False, "No booking available from previous test")
            return False
            
        try:
            payment_data = {
                'booking_id': self.test_booking['id'],
                'origin_url': self.base_url
            }
            
            response = requests.post(f"{self.api_url}/payments/checkout", json=payment_data, timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                checkout = response.json()
                details += f", Session ID: {checkout.get('session_id', 'N/A')[:20]}..."
                details += f", URL provided: {'url' in checkout}"
                # Store session for later tests
                self.test_session_id = checkout.get('session_id')
                
            self.log_test("Payment Checkout", success, details)
            return success
        except Exception as e:
            self.log_test("Payment Checkout", False, str(e))
            return False

    def test_payment_status(self):
        """Test payment status check"""
        if not hasattr(self, 'test_session_id') or not self.test_session_id:
            self.log_test("Payment Status", False, "No session ID available from previous test")
            return False
            
        try:
            response = requests.get(f"{self.api_url}/payments/status/{self.test_session_id}", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                status = response.json()
                details += f", Payment Status: {status.get('payment_status', 'N/A')}"
                details += f", Session Status: {status.get('status', 'N/A')}"
                
            self.log_test("Payment Status", success, details)
            return success
        except Exception as e:
            self.log_test("Payment Status", False, str(e))
            return False

    def test_contact_submission(self):
        """Test contact form submission"""
        try:
            contact_data = {
                'name': 'Test User',
                'email': 'test@example.com',
                'phone': '+1234567890',
                'message': 'This is a test message from the API test suite.'
            }
            
            response = requests.post(f"{self.api_url}/contact", json=contact_data, timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                contact = response.json()
                details += f", Contact ID: {contact.get('id', 'N/A')}"
                
            self.log_test("Contact Submission", success, details)
            return success
        except Exception as e:
            self.log_test("Contact Submission", False, str(e))
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Apollo's Hideaway API Tests")
        print(f"🔗 Base URL: {self.base_url}")
        print("=" * 60)
        
        # Test sequence
        tests = [
            self.test_api_root,
            self.test_get_villas,
            self.test_get_single_villa,
            self.test_check_availability,
            self.test_create_booking,
            self.test_get_booking,
            self.test_payment_checkout,
            self.test_payment_status,
            self.test_contact_submission
        ]
        
        for test in tests:
            test()
            print()
        
        # Summary
        print("=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

def main():
    tester = ApollosHideawayAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())