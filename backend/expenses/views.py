from rest_framework import viewsets
from .models import Expense
from .serializers import ExpenseSerializer
from rest_framework.permissions import IsAuthenticated

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return expenses only for the authenticated user
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associate the expense with the authenticated user
        serializer.save(user=self.request.user)


from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Expense, Budget, RecurringExpense
from .serializers import ExpenseSerializer, BudgetSerializer, RecurringExpenseSerializer

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RecurringExpenseViewSet(viewsets.ModelViewSet):
    queryset = RecurringExpense.objects.all()
    serializer_class = RecurringExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecurringExpense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer, CharField, EmailField

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)
    email = EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
        )
        return user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer