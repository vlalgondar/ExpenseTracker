from django.core.management.base import BaseCommand
from django.utils import timezone
from expenses.models import RecurringExpense, Expense
from datetime import timedelta

class Command(BaseCommand):
    help = 'Generate expenses from recurring expenses'

    def handle(self, *args, **kwargs):
        today = timezone.now().date()
        recurring_expenses = RecurringExpense.objects.filter(start_date__lte=today)

        for rec_expense in recurring_expenses:
            # Check if an expense has already been created for today
            last_expense = Expense.objects.filter(
                user=rec_expense.user,
                description=rec_expense.description,
                date=today
            ).first()

            if last_expense:
                continue  # Skip if expense already created

            # Determine if an expense should be created today based on frequency
            should_create = False
            frequency = rec_expense.frequency
            last_expense_date = rec_expense.start_date

            if frequency == 'DAILY':
                should_create = True
            elif frequency == 'WEEKLY':
                if (today - rec_expense.start_date).days % 7 == 0:
                    should_create = True
            elif frequency == 'BIWEEKLY':
                if (today - rec_expense.start_date).days % 14 == 0:
                    should_create = True
            elif frequency == 'MONTHLY':
                if rec_expense.start_date.day == today.day:
                    should_create = True
            elif frequency == 'YEARLY':
                if rec_expense.start_date.month == today.month and rec_expense.start_date.day == today.day:
                    should_create = True

            if should_create:
                if rec_expense.end_date and today > rec_expense.end_date:
                    continue  # Skip if beyond end date

                Expense.objects.create(
                    user=rec_expense.user,
                    description=rec_expense.description,
                    amount=rec_expense.amount,
                    date=today,
                    category=rec_expense.category,
                )
                self.stdout.write(f"Created expense for {rec_expense.description} on {today}")
