<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const faqSections = [
  {
    title: 'Orders',
    icon: 'bi-bag-check-fill',
    questions: [
      {
        question: 'How can I track my order?',
        answer: 'After logging in, go to My Orders from your profile menu. You will see your order status, order details, and latest updates.'
      },
      {
        question: 'Can I cancel my order?',
        answer: 'You can request cancellation while the order is still pending. Once the order is shipped, cancellation may not be available.'
      }
    ]
  },
  {
    title: 'Shipping',
    icon: 'bi-truck',
    questions: [
      {
        question: 'How long does delivery take?',
        answer: 'Delivery usually takes a few business days depending on your location and product availability.'
      },
      {
        question: 'Do you offer shipping tracking?',
        answer: 'Yes. You can follow your order status from Pending to Paid, Shipped, and Delivered through the My Orders page.'
      }
    ]
  },
  {
    title: 'Payments',
    icon: 'bi-credit-card-fill',
    questions: [
      {
        question: 'What payment methods are accepted?',
        answer: 'Available payment methods may include cash on delivery and online payment options depending on your checkout setup.'
      },
      {
        question: 'Is checkout secure?',
        answer: 'Yes. The platform is designed to support secure checkout and protected user sessions.'
      }
    ]
  },
  {
    title: 'Returns & Refunds',
    icon: 'bi-arrow-counterclockwise',
    questions: [
      {
        question: 'Can I return a product?',
        answer: 'Yes. Products can be returned according to the store return policy, provided they are eligible and in valid condition.'
      },
      {
        question: 'How do refunds work?',
        answer: 'Refunds are processed after the returned product is reviewed and approved by the store team.'
      }
    ]
  },
  {
    title: 'Account & Login',
    icon: 'bi-person-circle',
    questions: [
      {
        question: 'How do I update my profile?',
        answer: 'Log in and open Profile Settings from the account dropdown menu to update your personal information and profile photo.'
      },
      {
        question: 'Why do I need an account?',
        answer: 'An account allows you to manage your cart, place orders, view order history, and access personalized features.'
      }
    ]
  }
]

const flatFaqs = faqSections.flatMap((section) =>
  section.questions.map((item) => ({
    ...item,
    section: section.title,
    icon: section.icon
  }))
)
</script>

<template>
  <section class="faq-page">
    <!-- Hero -->
    <div class="faq-hero text-white text-center">
      <div class="container">
        <span class="badge bg-warning text-dark px-3 py-2 rounded-pill mb-3">
          Help Center
        </span>
        <h1 class="display-5 fw-bolder mb-3">
          How can we help you?
        </h1>
        <p class="lead opacity-75 mx-auto mb-0" style="max-width: 700px;">
          Find quick answers about orders, shipping, payments, returns, and account management.
        </p>
      </div>
    </div>

    <!-- FAQ Content -->
    <div class="container py-5">
      <div class="row g-4 mb-5">
        <div
          v-for="section in faqSections"
          :key="section.title"
          class="col-6 col-md"
        >
          <div class="topic-card text-center p-4 rounded-4 h-100">
            <i :class="`bi ${section.icon}`"></i>
            <h6 class="fw-bold mt-3 mb-0">{{ section.title }}</h6>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-9">
          <div class="faq-list rounded-4 shadow-sm overflow-hidden">
            <div
              v-for="(faq, index) in flatFaqs"
              :key="faq.question"
              class="faq-item"
            >
              <button
                class="faq-question"
                type="button"
                @click="toggleFaq(index)"
              >
                <span class="d-flex align-items-center gap-3">
                  <span class="faq-icon">
                    <i :class="`bi ${faq.icon}`"></i>
                  </span>

                  <span>
                    <small class="text-warning fw-bold d-block mb-1">
                      {{ faq.section }}
                    </small>
                    <span class="fw-bold">{{ faq.question }}</span>
                  </span>
                </span>

                <i
                  class="bi bi-chevron-down faq-arrow"
                  :class="{ rotate: activeIndex === index }"
                ></i>
              </button>

              <transition name="faq">
                <div
                  v-if="activeIndex === index"
                  class="faq-answer"
                >
                  {{ faq.answer }}
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Support Box -->
      <div class="support-box text-center text-white rounded-5 p-5 mt-5 shadow-lg">
        <h2 class="fw-bolder mb-3">Still Need Help?</h2>
        <p class="opacity-75 mb-4">
          Contact our support team and we will help you as soon as possible.
        </p>

        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <a href="mailto:support@example.com" class="btn btn-warning rounded-pill px-4 fw-bold">
            <i class="bi bi-envelope-fill me-2"></i>
            support@example.com
          </a>

          <a href="tel:+201000000000" class="btn btn-outline-light rounded-pill px-4 fw-bold">
            <i class="bi bi-telephone-fill me-2"></i>
            +20 100 000 0000
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-page {
  background: #f8fafc;
  min-height: 100vh;
}

.faq-hero {
  padding: 6rem 0;
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.92)),
    url('https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1800&q=80') center/cover no-repeat;
}

.topic-card {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  transition: all 0.3s ease;
}

.topic-card i {
  font-size: 2rem;
  color: #ffc107;
}

.topic-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.1);
}

.faq-list {
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.faq-item:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}

.faq-question {
  width: 100%;
  border: none;
  background: #ffffff;
  color: #0f172a;
  padding: 1.4rem 1.6rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #fff8e1;
}

.faq-icon {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 50%;
  background: #fff3cd;
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.faq-arrow {
  transition: transform 0.3s ease;
  color: #64748b;
}

.faq-arrow.rotate {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.6rem 1.5rem 5.3rem;
  color: #64748b;
  line-height: 1.8;
  background: #ffffff;
}

.support-box {
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(37, 99, 235, 0.8)),
    url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
}

.faq-enter-active,
.faq-leave-active {
  transition: all 0.25s ease;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 576px) {
  .faq-hero {
    padding: 4rem 0;
  }

  .faq-question {
    padding: 1rem;
  }

  .faq-answer {
    padding: 0 1rem 1.2rem 1rem;
  }
}
</style>