# Generated by Django 4.0.4 on 2022-06-22 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TLG_App', '0009_merge_20220622_0059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='gender',
            field=models.CharField(choices=[('Boys', 'Boys'), ('Girls', 'Girls')], max_length=5),
        ),
    ]
