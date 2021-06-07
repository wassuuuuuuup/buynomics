export async function sleep(duration: number): Promise<void> {
	return await new Promise(r => setTimeout(r, duration));
}