# Generated by Django 3.1.1 on 2020-09-17 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_category_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
