
  // البيانات الأساسية للتطبيق
  const subjectsByLevel = {
    "ثانوي": [
      "رياضيات", "علوم فيزيائية", "لغة عربية", "علوم طبيعية", 
      "علوم اسلامية", "تاريخ وجغرافيا", "فلسفة", "لغة فرنسية", 
      "لغة إنجليزية", "تربية بدنية", "لغة أمازيغية"
    ],
    "متوسط": [
      "لغة عربية", "رياضيات", "علوم طبيعية", "علوم فيزيائية", 
      "تاريخ وجغرافيا", "علوم اسلامية", "لغة فرنسية", "تربية بدنية"
    ],
    "ابتدائي": [
      "لغة عربية", "رياضيات", "نشاط علمي", "نشاط فني", 
      "تربية اسلامية", "تربية بدنية"
    ]
  };
  
  const defaultCoefs = {
    "ثانوي": { 
      "رياضيات": 5, "علوم فيزيائية": 4, "لغة عربية": 3, 
      "علوم طبيعية": 4, "علوم اسلامية": 2, "تاريخ وجغرافيا": 2, 
      "فلسفة": 2, "لغة فرنسية": 2, "لغة إنجليزية": 2, 
      "تربية بدنية": 1, "لغة أمازيغية": 1 
    },
    "متوسط": { 
      "لغة عربية": 3, "رياضيات": 4, "علوم طبيعية": 2, 
      "علوم فيزيائية": 2, "تاريخ وجغرافيا": 2, "علوم اسلامية": 2, 
      "لغة فرنسية": 2, "تربية بدنية": 1 
    },
    "ابتدائي": { 
      "لغة عربية": 5, "رياضيات": 5, "نشاط علمي": 2, 
      "نشاط فني": 1, "تربية اسلامية": 3, "تربية بدنية": 1 
    }
  };
  
  const gradeRanges = [
    { min: 17, max: 20, grade: "ممتاز", emoji: "🎯", color: "#4CAF50" },
    { min: 15, max: 16.99, grade: "جيد جداً", emoji: "👍", color: "#8BC34A" },
    { min: 12, max: 14.99, grade: "جيد", emoji: "👌", color: "#FFC107" },
    { min: 10, max: 11.99, grade: "مقبول", emoji: "🙂", color: "#FF9800" },
    { min: 0, max: 9.99, grade: "ضعيف", emoji: "💪", color: "#F44336" }
  ];
  
  // عناصر DOM
  const select = document.getElementById('level-select');
  const form = document.getElementById('subjects-form');
  const tbody = document.querySelector('#subjects-table tbody');
  const resultDiv = document.getElementById('result');
  const chartContainer = document.getElementById('chart-container');
  const modeIcon = document.getElementById('mode-icon');
  const bgAnimation = document.getElementById('bg-animation');
  let gradesChart = null;

  // إنشاء جسيمات الخلفية المتحركة
  function createParticles() {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // أحجام وألوان عشوائية
      const size = Math.random() * 20 + 5;
      const opacity = Math.random() * 0.5 + 0.1;
      const color = `hsl(${Math.random() * 60 + 150}, 70%, 60%)`;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.opacity = opacity;
      
      // مواقع وتأخيرات عشوائية
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `-${size}px`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      bgAnimation.appendChild(particle);
    }
  }
  
  // تهيئة الصفحة
  document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // تحميل آخر سنة تم اختيارها
    const lastLevel = localStorage.getItem('lastSelectedLevel');
    if (lastLevel) {
      select.value = lastLevel;
      select.dispatchEvent(new Event('change'));
    }
    
    // تحميل تفضيل الوضع الداكن
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
    updateModeIcon(darkMode);
  });

  // تحديث أيقونة الوضع
  function updateModeIcon(isDark) {
    modeIcon.textContent = isDark ? "☀️" : "🌙";
  }

  // التعامل مع اختيار السنة
  select.addEventListener('change', () => {
    const selectedOption = select.selectedOptions[0];
    if (!selectedOption.value) {
      form.classList.add('hidden');
      resultDiv.classList.add('hidden');
      chartContainer.classList.add('hidden');
      return;
    }
    
    localStorage.setItem('lastSelectedLevel', selectedOption.value);
    
    const level = selectedOption.dataset.level;
    tbody.innerHTML = '';
    
    subjectsByLevel[level].forEach((subject, index) => {
      const coef = defaultCoefs[level][subject] || 1;
      const row = document.createElement('tr');
      row.style.animationDelay = `${index * 0.1}s`;
      row.classList.add('animate__animated', 'animate__fadeInUp');
      
      row.innerHTML = `
        <td>${subject}</td>
        <td><input type="number" min="0" max="20" step="0.25" class="mark devoir" placeholder="0-20"></td>
        <td><input type="number" min="0" max="20" step="0.25" class="mark exam" placeholder="0-20"></td>
        <td><input type="number" min="0" max="20" step="0.25" class="mark evaluation" placeholder="0-20"></td>
        <td><input type="number" min="1" max="10" step="1" class="coef" value="${coef}"></td>
      `;
      tbody.appendChild(row);
    });
    
    form.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    chartContainer.classList.add('hidden');
  });
  
  // حساب المعدل
  document.getElementById('calculate-btn').addEventListener('click', () => {
    const rows = Array.from(document.querySelectorAll('#subjects-table tbody tr'));
    let total = 0, weightSum = 0;
    const subjectsData = [];
    let hasError = false;
    
    rows.forEach(row => {
      const subjectName = row.cells[0].textContent;
      const devoir = parseFloat(row.querySelector('.devoir').value) || 0;
      const exam = parseFloat(row.querySelector('.exam').value) || 0;
      const evalMark = parseFloat(row.querySelector('.evaluation').value) || 0;
      const coef = parseInt(row.querySelector('.coef').value) || 1;
      
      // التحقق من صحة المدخلات
      if (devoir < 0 || devoir > 20 || exam < 0 || exam > 20 || evalMark < 0 || evalMark > 20) {
        row.classList.add('animate__animated', 'animate__shakeX');
        setTimeout(() => row.classList.remove('animate__animated', 'animate__shakeX'), 1000);
        hasError = true;
        return;
      }
      
      const subjectAvg = (devoir * 0.25 + exam * 0.5 + evalMark * 0.25);
      total += subjectAvg * coef;
      weightSum += coef;
      
      subjectsData.push({
        name: subjectName,
        average: subjectAvg,
        coefficient: coef
      });
    });
    
    if (hasError) {
      const errorElement = document.createElement('div');
      errorElement.textContent = "يرجى إدخال قيم صحيحة بين 0 و 20 لجميع المواد";
      errorElement.style.color = "var(--danger-color)";
      errorElement.style.textAlign = "center";
      errorElement.style.margin = "1rem 0";
      errorElement.classList.add('animate__animated', 'animate__shakeX');
      
      const existingError = document.querySelector('.error-message');
      if (existingError) existingError.remove();
      
      errorElement.classList.add('error-message');
      form.appendChild(errorElement);
      return;
    }
    
    const avg = weightSum ? (total / weightSum).toFixed(2) : 0;
    document.getElementById('total').textContent = total.toFixed(2);
    document.getElementById('average').textContent = avg;
    
    // تحديد التقدير
    const gradeElement = document.getElementById('grade');
    const foundGrade = gradeRanges.find(range => avg >= range.min && avg <= range.max);
    
    if (foundGrade) {
      gradeElement.textContent = `${foundGrade.grade} ${foundGrade.emoji}`;
      gradeElement.style.color = foundGrade.color;
    } else {
      gradeElement.textContent = "غير محدد";
    }
    
    // عرض النتيجة مع تأثير
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('animate__animated', 'animate__flipInX');
    setTimeout(() => resultDiv.classList.remove('animate__animated', 'animate__flipInX'), 1000);
    
    // رسم الرسم البياني
    drawChart(subjectsData, avg);
  });
  
  // إعادة تعيين النموذج
  document.getElementById('reset-btn').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#subjects-table input');
    inputs.forEach(input => {
      if (input.classList.contains('coef')) {
        const level = select.selectedOptions[0].dataset.level;
        const subject = input.closest('tr').cells[0].textContent;
        input.value = defaultCoefs[level][subject] || 1;
      } else {
        input.value = '';
      }
    });
    
    resultDiv.classList.add('hidden');
    chartContainer.classList.add('hidden');
    
    // تأثير عند الإعادة
    form.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
      form.classList.remove('animate__animated', 'animate__fadeOut');
      form.classList.add('animate__animated', 'animate__fadeIn');
      setTimeout(() => form.classList.remove('animate__animated', 'animate__fadeIn'), 1000);
    }, 500);
  });
  
  document.getElementById('mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    updateModeIcon(isDark);
    
    // تأثير التبديل
    document.body.classList.add('animate__animated', 'animate__faster', 'animate__fadeIn');
    setTimeout(() => document.body.classList.remove('animate__animated', 'animate__faster', 'animate__fadeIn'), 500);
    
    // إعادة رسم الرسم البياني إذا كان موجوداً
    if (gradesChart) {
      const canvas = document.getElementById('grades-chart');
      const ctx = canvas.getContext('2d');
      const currentData = gradesChart.data;
      gradesChart.destroy();
      gradesChart = new Chart(ctx, {
        type: 'bar',
        data: currentData,
        options: getChartOptions()
      });
    }
  });
  
  // رسم الرسم البياني
  function drawChart(subjectsData, overallAverage) {
    const canvas = document.getElementById('grades-chart');
    const ctx = canvas.getContext('2d');
    
    // إزالة الرسم البياني السابق إذا كان موجوداً
    if (gradesChart) {
      gradesChart.destroy();
    }
    
    const labels = subjectsData.map(subject => subject.name);
    const averages = subjectsData.map(subject => subject.average);
    const coefficients = subjectsData.map(subject => subject.coefficient);
    
    const backgroundColors = averages.map(avg => {
      return avg >= 10 ? 
        (document.body.classList.contains('dark') ? '#81C784' : '#4CAF50') : 
        (document.body.classList.contains('dark') ? '#E57373' : '#F44336');
    });
    
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'معدل المواد',
          data: averages,
          backgroundColor: backgroundColors,
          borderColor: document.body.classList.contains('dark') ? '#444' : '#ddd',
          borderWidth: 1,
          borderRadius: 5
        },
        {
          label: 'المعامل',
          data: coefficients,
          backgroundColor: document.body.classList.contains('dark') ? 'rgba(100, 181, 246, 0.7)' : 'rgba(66, 165, 245, 0.7)',
          borderColor: document.body.classList.contains('dark') ? '#64B5F6' : '#42A5F5',
          borderWidth: 2,
          type: 'line',
          yAxisID: 'y1',
          tension: 0.3
        }
      ]
    };
    
    gradesChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: getChartOptions(overallAverage)
    });
    
    chartContainer.classList.remove('hidden');
    chartContainer.classList.add('animate__animated', 'animate__fadeInUp');
    setTimeout(() => chartContainer.classList.remove('animate__animated', 'animate__fadeInUp'), 1000);
  }
  
  function getChartOptions(overallAverage) {
    const isDark = document.body.classList.contains('dark');
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 20,
          title: {
            display: true,
            text: 'المعدل',
            color: isDark ? '#fff' : '#666'
          },
          grid: {
            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: isDark ? '#fff' : '#666'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: isDark ? '#fff' : '#666'
          }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          max: 10,
          grid: {
            drawOnChartArea: false
          },
          title: {
            display: true,
            text: 'المعامل',
            color: isDark ? '#fff' : '#666'
          },
          ticks: {
            color: isDark ? '#fff' : '#666'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          rtl: true,
          labels: {
            color: isDark ? '#fff' : '#666',
            font: {
              family: 'Tajawal'
            }
          }
        },
        tooltip: {
          rtl: true,
          titleFont: {
            family: 'Tajawal'
          },
          bodyFont: {
            family: 'Tajawal'
          }
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: overallAverage,
              yMax: overallAverage,
              borderColor: isDark ? '#FF5252' : '#F44336',
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                content: `المعدل العام: ${overallAverage}`,
                enabled: true,
                position: 'left',
                backgroundColor: isDark ? '#FF5252' : '#F44336',
                color: '#fff',
                font: {
                  family: 'Tajawal',
                  size: 12
                }
              }
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    };
  }