// /app/handwritten/structuredText.ts
import { NoteContent } from "@/types";



export const complexMathLinearAlgebraContent: NoteContent = {
  pageHeading: "Complex Maths & Linear Algebra",
  subHeadings: [
    {
      title: "Key Concepts",
      paragraphs: [
        "Complex numbers extend the real number system using the imaginary unit i, where i² = -1.",
        "Linear algebra studies vectors, vector spaces, and linear transformations.",
        "The conjugate of a complex number z = a + bi is z* = a - bi.",
        "Linear independence is essential for understanding the structure of vector spaces."
      ],
      formulas: [
        "i^2 = -1",
        "z = a + bi",
        "|z| = sqrt(a^2 + b^2)",
        "z^* = a - bi"
      ]
    },
    {
      title: "Vector Spaces",
      paragraphs: [
        "A vector space is a set of vectors with operations of addition and scalar multiplication.",
        "Examples include ℝⁿ and polynomial spaces.",
        "A subspace is a subset of a vector space that is itself a vector space.",
        "The dimension of a vector space is the number of vectors in a basis for the space."
      ],
      formulas: [
        "V = {v₁, v₂, ..., vₙ} | vᵢ ∈ ℝ",
        "c₁v₁ + c₂v₂ + ... + cₙvₙ = 0",
        "dim(V) = n"
      ]
    },
    {
      title: "Matrix Operations",
      paragraphs: [
        "Matrices represent linear transformations and systems of equations.",
        "Matrix multiplication is not commutative.",
        "The transpose of a matrix A is denoted Aᵗ.",
        "The inverse of a square matrix A exists if det(A) ≠ 0."
      ],
      formulas: [
        "A = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix}",
        "det(A) = a_{11}a_{22} - a_{12}a_{21}",
        "A^{-1}A = I",
        "A^T"
      ]
    },
    {
      title: "Eigenvalues & Eigenvectors",
      paragraphs: [
        "If Av = λv, v ≠ 0, then v is an eigenvector and λ is its eigenvalue.",
        "Eigenvalues are roots of det(A - λI) = 0.",
        "The geometric multiplicity of an eigenvalue is the number of linearly independent eigenvectors associated with it.",
        "Eigenvectors corresponding to distinct eigenvalues are linearly independent."
      ],
      formulas: [
        "Av = λv",
        "det(A - λI) = 0"
      ]
    },
    {
      title: "Applications",
      paragraphs: [
        "Complex numbers: signal processing, quantum mechanics.",
        "Linear algebra: computer graphics, machine learning.",
        "Eigenvalues: stability analysis in differential equations.",
        "Matrices: encoding and transforming data in statistics and engineering."
      ],
      formulas: [
        "x' = Ax",
        "A = PDP^{-1}",
        "F(x) = Ax + b"
      ]
    },
    {
      title: "Diagram: Complex Plane",
      paragraphs: [
        "The complex plane visualizes complex numbers as points in two dimensions.",
        "The horizontal axis represents the real part; the vertical axis represents the imaginary part.",
        "The modulus of a complex number is its distance from the origin."
      ],
      diagram: {
        src: "complex-plane-placeholder.png",
        caption: "Argand diagram: real and imaginary axes."
      }
    },
    {
      title: "Boxed Note",
      paragraphs: [
        "The set of eigenvectors for distinct eigenvalues is linearly independent.",
        "A square matrix is invertible if and only if its determinant is nonzero."
      ],
      textBox: "Tip: Use Gaussian elimination for solving linear systems."
    },
    {
      title: "Linear Transformations",
      paragraphs: [
        "A linear transformation maps vectors from one vector space to another, preserving vector addition and scalar multiplication.",
        "Every linear transformation from ℝⁿ to ℝᵐ can be represented by an m×n matrix.",
        "The kernel (null space) and image (range) are key subspaces associated with a linear transformation."
      ],
      formulas: [
        "T(v + w) = T(v) + T(w)",
        "T(cv) = cT(v)",
        "ker(T) = {v ∈ V | T(v) = 0}"
      ]
    },
    {
      title: "Inner Product & Orthogonality",
      paragraphs: [
        "The inner product (dot product) of two vectors measures their similarity.",
        "Two vectors are orthogonal if their inner product is zero.",
        "Orthogonal vectors form the basis for many applications, including Fourier analysis."
      ],
      formulas: [
        "⟨u, v⟩ = u₁v₁ + u₂v₂ + ... + uₙvₙ",
        "u ⊥ v ⇔ ⟨u, v⟩ = 0"
      ]
    },
    {
      title: "Diagonalization",
      paragraphs: [
        "A matrix is diagonalizable if it is similar to a diagonal matrix.",
        "Diagonalization simplifies matrix computations, especially for powers of matrices.",
        "Not all matrices are diagonalizable."
      ],
      formulas: [
        "A = PDP^{-1}",
        "D = \\text{diag}(λ₁, λ₂, ..., λₙ)"
      ]
    },
    {
      title: "Complex Exponentials & Euler's Formula",
      paragraphs: [
        "Euler's formula links complex exponentials to trigonometric functions.",
        "Complex exponentials are fundamental in signal analysis and quantum mechanics."
      ],
      formulas: [
        "e^{ix} = \\cos x + i \\sin x",
        "z = re^{iθ}"
      ]
    }
  ]
};
