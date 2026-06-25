# Item Response Theory (IRT) Scoring Model

OpenCognitive uses **Item Response Theory (IRT)** to score assessments. Unlike classical test theory (which simply sums correct answers), IRT evaluates responses based on the individual psychometric characteristics of each question.

---

## 📈 The 3-Parameter Logistic (3PL) Model

Each item $i$ in the assessment is defined by three parameters:
1. **Difficulty ($b_i$):** The ability level ($\theta$) at which a user has a $50\%$ chance of answering correctly (excluding the guessing floor).
2. **Discrimination ($a_i$):** How steeply the probability of a correct response increases with ability. Highly discriminating items are good at separating ability levels.
3. **Guessing ($c_i$):** The probability that a low-ability user gets the item correct by pure chance (e.g., $1/\text{number of options}$).

The probability $P_i(\theta)$ that a user with latent ability $\theta$ answers item $i$ correctly is modeled as:

$$P_i(\theta) = c_i + \frac{1 - c_i}{1 + e^{-a_i(\theta - b_i)}}$$

---

## 🧮 Expected A Posteriori (EAP) Ability Estimation

To calculate a user's final latent trait score ($\theta$), we use **Bayesian Expected A Posteriori (EAP)** estimation. EAP integrates the likelihood function over a prior ability distribution.

### 1. Likelihood Function
Given a vector of user responses $\mathbf{u} = [u_1, u_2, \dots, u_J]$ (where $u_i = 1$ for correct and $0$ for incorrect), the likelihood $L(\mathbf{u}|\theta)$ is:

$$L(\mathbf{u}|\theta) = \prod_{j=1}^{J} P_j(\theta)^{u_j} \left(1 - P_j(\theta)\right)^{1 - u_j}$$

### 2. Numerical Integration
We approximate the continuous integration using Gauss-Hermite quadrature over $K = 41$ nodes spanning $[-4, 4]$:

$$\hat{\theta}_{EAP} = \frac{\sum_{k=1}^{K} \theta_k L(\mathbf{u}|\theta_k) A(\theta_k)}{\sum_{k=1}^{K} L(\mathbf{u}|\theta_k) A(\theta_k)}$$

where:
* $\theta_k$ is the ability node value.
* $A(\theta_k)$ is the weight of the prior distribution (standard normal distribution, $\theta \sim N(0, 1)$) at node $\theta_k$.

### 3. Metric Scaling
The EAP score $\hat{\theta}_{EAP}$ represents a standard score where $0$ is the mean of the calibration cohort and $1$ is one standard deviation. For user readability, we scale this to the traditional IQ scale ($M = 100, SD = 15$):

$$\text{IQ} = 100 + 15 \times \hat{\theta}_{EAP}$$

---

## 🔬 Calibrated Item Parameters
The specific parameters ($a_i, b_i, c_i$) utilized in the assessment are derived from public psychometric tables calibrated on adult/adolescent testing datasets.
