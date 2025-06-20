from django.db import models

class Payment(models.Model):
    stripe_session_id = models.CharField(max_length=255, unique=True)
    amount_total = models.IntegerField()  # Stored in paisa (₹ * 100)
    email = models.EmailField(blank=True, null=True)
    payment_status = models.CharField(max_length=50)  # e.g., 'paid', 'unpaid', 'failed'
    currency = models.CharField(max_length=10, default='INR')  # Optional but good to have
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.stripe_session_id} - ₹{self.amount_total / 100:.2f}"
