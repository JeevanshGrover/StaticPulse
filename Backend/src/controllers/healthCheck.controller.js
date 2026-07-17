
export const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        status: "OK",
        message: "Backend is running...",
        timestamp: new Date().toISOString(),
    })
}
